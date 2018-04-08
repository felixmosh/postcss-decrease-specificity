const postcss = require('postcss');
const parser = require('postcss-selector-parser');
const parse = parser();

function isCombinator(node) {
    return node.type === 'combinator' && node.value.trim() === '';
}

function isClass(node) {
    return node.type === 'class';
}

function hasClassNode(nodes) {
    return nodes.some(isClass);
}

function splitByCombinator(nodes) {
    return nodes.reduce((chunks, node) => {
        chunks[chunks.length - 1].push(node);
        if (isCombinator(node)) {
            chunks.push([]);
        }
        return chunks;
    }, [[]]);
}

function getDeletableClasses(chunks, requiredDepth) {
    let numOfClasses = 0;
    return chunks
        .reverse()
        .reduce((acc, node) => {
            if (hasClassNode(node) && numOfClasses < requiredDepth) {
                numOfClasses++;
            } else if (hasClassNode(node)) {
                acc.push(node);
            }
            return acc;
        }, [])
        .reverse()
        .reduce((acc, node) => acc.concat(node), []);
}

function decreaseSpecificityOfSelector(selector, options) {
    const parsedSelector = parse.astSync(selector);
    const nodes = parsedSelector.nodes[0].nodes;
    const chunks = splitByCombinator(nodes);
    const currentDepth = chunks.filter(hasClassNode).length;

    if (currentDepth > options.depth) {
        const deletableClasses = getDeletableClasses(chunks, options.depth);
        parsedSelector.nodes[0].nodes = nodes
            .filter((node) => deletableClasses.indexOf(node) === -1);
    }

    return parsedSelector.toString();
}

function decreaseSpecificityOfRule(rule, options) {
    rule.selectors = rule.selectors
        .map((selector) => decreaseSpecificityOfSelector(selector, options));
}


module.exports = postcss.plugin('postcss-decrease-specificity', (opts) => {
    const defaults = {
        depth: 3
    };

    const options = Object.assign({}, defaults, opts);

    return function (root) {
        root.walkRules((rule) => decreaseSpecificityOfRule(rule, options));
    };
});
