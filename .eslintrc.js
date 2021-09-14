module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: [
            "error",
            4,
            {
                offsetTernaryExpressions: true,
                flatTernaryExpressions: true,
                ignoredNodes: ["ConditionalExpression"],
                FunctionExpression: { parameters: "first" },
                CallExpression: { arguments: "first" },
                FunctionDeclaration: { parameters: "first" }
            }
        ],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "multiline-ternary": ["error", "always-multiline"],
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
