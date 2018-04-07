module.exports = function () {

    return {
        files: ['/*.js', '!*.spec.js'],

        tests: ['*.spec.js'],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest'
    };
};
