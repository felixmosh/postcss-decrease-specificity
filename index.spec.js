const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts) {
    return postcss([plugin(opts)])
        .process(input, { from: undefined })
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

describe('postcss-decrease-specificity', () => {
    it('should decrease specificity - sunny case', () => {
        return run('.a .b .c .d{ decl:1 }',
            '.b .c .d{ decl:1 }', {});
    });

    it('should decrease specificity - multiple classes', () => {
        return run('.a .b .c.x .d{ decl:1 }', '.b .c.x .d{ decl:1 }', {});
    });

    it('should decrease specificity - more than 4', () => {
        return run('.a .b .c .d .e .f{ decl:1 }', '.d .e .f{ decl:1 }', {});
    });

    it('should decrease specificity - adjacent sibling combinator', () => {
        return run('.a .b .c + .d .e .f{ decl:1 }', '.c + .d .e .f{ decl:1 }', {});
    });

    it('should decrease specificity - general sibling combinator', () => {
        return run('.a .b .c ~ .d .e .f{ decl:1 }', '.c ~ .d .e .f{ decl:1 }', {});
    });

    it('should decrease specificity - child combinator', () => {
        return run('.a .b .c > .d .e .f{ decl:1 }', '.c > .d .e .f{ decl:1 }', {});
    });

    it('should decrease specificity - consider only descendant combinator', () => {
        return run('.a .b + .c > .d .e ~ .f .h{ decl:1 }', '.b + .c > .d .e ~ .f .h{ decl:1 }', {});
    });

    it('should decrease specificity - consider only class selectors', () => {
        return run('tag #id .class a:pseudo{ decl:1 }', 'tag #id .class a:pseudo{ decl:1 }', {});
    });

    it('should decrease specificity - consider only class selectors', () => {
        return run('.class1 tag.class2 #id .class3 a.class3:pseudo{ decl:1 }',
            'tag.class2 #id .class3 a.class3:pseudo{ decl:1 }', {});
    });

    it('should not change specificity if depth is lower than options.depth', () => {
        return run('.a .b .c .d{ decl:1 }', '.a .b .c .d{ decl:1 }', { depth: 4 });
    });

    it('should support media query', () => {
        return run('@media print {.a .b.x .c .d{ decl:1 }}', '@media print {.b.x .c .d{ decl:1 }}');
    });
});
