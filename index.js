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

function getChunksByCombinator(nodes) {
    return nodes.reduce((chunks, node) => {
        if (isCombinator(node)) {
            chunks.push([]);
        } else {
            chunks[chunks.length - 1].push(node);
        }
        return chunks;
    }, [[]]);
}

function getFirstClassNode(chunks, depth) {
    const onlyClassesChunks = chunks.filter(hasClassNode);
    return (onlyClassesChunks.length > depth ? onlyClassesChunks.slice(depth * -1) : chunks)[0][0];
}

function decreaseSpecificityOfSelector(selector, options) {
    const parsedSelector = parse.astSync(selector);
    const nodes = parsedSelector.nodes[0].nodes;
    const chunks = getChunksByCombinator(nodes);
    const currentDepth = chunks.length;

    if (currentDepth > options.depth) {
        const firstClassNode = getFirstClassNode(chunks, options.depth);
        const firstClassNodeIdx = nodes.indexOf(firstClassNode);
        parsedSelector.nodes[0].nodes = nodes.slice(firstClassNodeIdx);
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
