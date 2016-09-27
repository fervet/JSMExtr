const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");

describe("JS", function () {

    it("extract AST from JS file", function () {
        const jsAST = extractJavaScriptASTsFromJsFile('spec/demo/demo.js', 'utf8');

        const expectedDemoAST = {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'console',
                                loc: {start: {line: 1, column: 0}, end: {line: 1, column: 7}}
                            },
                            property: {
                                type: 'Identifier',
                                name: 'log',
                                loc: {start: {line: 1, column: 8}, end: {line: 1, column: 11}}
                            },
                            loc: {start: {line: 1, column: 0}, end: {line: 1, column: 11}}
                        },
                        arguments: [
                            {
                                type: 'Literal',
                                value: 'loggy',
                                raw: '"loggy"',
                                loc: {start: {line: 1, column: 12}, end: {line: 1, column: 19}}
                            }
                        ],
                        loc: {start: {line: 1, column: 0}, end: {line: 1, column: 20}}
                    },
                    loc: {start: {line: 1, column: 0}, end: {line: 1, column: 21}}
                }, {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'one',
                        loc: {start: {line: 3, column: 9}, end: {line: 3, column: 12}}
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'console',
                                            loc: {start: {line: 4, column: 4}, end: {line: 4, column: 11}}
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'log',
                                            loc: {start: {line: 4, column: 12}, end: {line: 4, column: 15}}
                                        },
                                        loc: {start: {line: 4, column: 4}, end: {line: 4, column: 15}}
                                    },
                                    arguments: [
                                        {
                                            type: 'Literal',
                                            value: 'function-one',
                                            raw: '"function-one"',
                                            loc: {start: {line: 4, column: 16}, end: {line: 4, column: 30}}
                                        }
                                    ],
                                    loc: {start: {line: 4, column: 4}, end: {line: 4, column: 31}}
                                },
                                loc: {start: {line: 4, column: 4}, end: {line: 4, column: 32}}
                            }
                        ],
                        loc: {start: {line: 3, column: 15}, end: {line: 5, column: 1}}
                    },
                    generator: false,
                    expression: false,
                    loc: {start: {line: 3, column: 0}, end: {line: 5, column: 1}}
                }, {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'two',
                        loc: {start: {line: 7, column: 9}, end: {line: 7, column: 12}}
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'twoVar',
                                            loc: {start: {line: 8, column: 8}, end: {line: 8, column: 14}}
                                        },
                                        init: {
                                            type: 'Literal',
                                            value: '222222',
                                            raw: '"222222"',
                                            loc: {start: {line: 8, column: 17}, end: {line: 8, column: 25}}
                                        },
                                        loc: {start: {line: 8, column: 8}, end: {line: 8, column: 25}}
                                    }
                                ],
                                kind: 'var',
                                loc: {start: {line: 8, column: 4}, end: {line: 8, column: 26}}
                            }, {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'document',
                                            loc: {start: {line: 9, column: 4}, end: {line: 9, column: 12}}
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'write',
                                            loc: {start: {line: 9, column: 13}, end: {line: 9, column: 18}}
                                        },
                                        loc: {start: {line: 9, column: 4}, end: {line: 9, column: 18}}
                                    },
                                    arguments: [
                                        {
                                            type: 'Identifier',
                                            name: 'twoVar',
                                            loc: {start: {line: 9, column: 19}, end: {line: 9, column: 25}}
                                        }
                                    ],
                                    loc: {start: {line: 9, column: 4}, end: {line: 9, column: 26}}
                                },
                                loc: {start: {line: 9, column: 4}, end: {line: 9, column: 27}}
                            }, {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'twoVar',
                                    loc: {start: {line: 10, column: 11}, end: {line: 10, column: 17}}
                                },
                                loc: {start: {line: 10, column: 4}, end: {line: 10, column: 18}}
                            }
                        ],
                        loc: {start: {line: 7, column: 15}, end: {line: 11, column: 1}}
                    },
                    generator: false,
                    expression: false,
                    loc: {start: {line: 7, column: 0}, end: {line: 11, column: 1}}
                }, {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'three',
                        loc: {start: {line: 13, column: 9}, end: {line: 13, column: 14}}
                    },
                    params: [
                        {
                            type: 'Identifier',
                            name: 'a',
                            loc: {start: {line: 13, column: 15}, end: {line: 13, column: 16}}
                        }, {
                            type: 'Identifier',
                            name: 'b',
                            loc: {start: {line: 13, column: 18}, end: {line: 13, column: 19}}
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'IfStatement',
                                test: {
                                    type: 'BinaryExpression',
                                    operator: '>',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a',
                                        loc: {start: {line: 14, column: 8}, end: {line: 14, column: 9}}
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'b',
                                        loc: {start: {line: 14, column: 12}, end: {line: 14, column: 13}}
                                    },
                                    loc: {start: {line: 14, column: 8}, end: {line: 14, column: 13}}
                                },
                                consequent: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'a',
                                                loc: {start: {line: 15, column: 15}, end: {line: 15, column: 16}}
                                            },
                                            loc: {start: {line: 15, column: 8}, end: {line: 15, column: 17}}
                                        }
                                    ],
                                    loc: {start: {line: 14, column: 15}, end: {line: 16, column: 5}}
                                },
                                alternate: null,
                                loc: {start: {line: 14, column: 4}, end: {line: 16, column: 5}}
                            }, {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'b',
                                    loc: {start: {line: 17, column: 11}, end: {line: 17, column: 12}}
                                },
                                loc: {start: {line: 17, column: 4}, end: {line: 17, column: 13}}
                            }
                        ],
                        loc: {start: {line: 13, column: 21}, end: {line: 18, column: 1}}
                    },
                    generator: false,
                    expression: false,
                    loc: {start: {line: 13, column: 0}, end: {line: 18, column: 1}}
                }, {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'four',
                        loc: {start: {line: 20, column: 9}, end: {line: 20, column: 13}}
                    },
                    params: [
                        {
                            type: 'Identifier',
                            name: 'myArray',
                            loc: {start: {line: 20, column: 14}, end: {line: 20, column: 21}}
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'sum',
                                            loc: {start: {line: 21, column: 8}, end: {line: 21, column: 11}}
                                        },
                                        init: {
                                            type: 'Literal',
                                            value: 0,
                                            raw: '0',
                                            loc: {start: {line: 21, column: 14}, end: {line: 21, column: 15}}
                                        },
                                        loc: {start: {line: 21, column: 8}, end: {line: 21, column: 15}}
                                    }
                                ],
                                kind: 'var',
                                loc: {start: {line: 21, column: 4}, end: {line: 21, column: 16}}
                            }, {
                                type: 'ForStatement',
                                init: {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'i',
                                                loc: {start: {line: 22, column: 13}, end: {line: 22, column: 14}}
                                            },
                                            init: {
                                                type: 'Literal',
                                                value: 0,
                                                raw: '0',
                                                loc: {start: {line: 22, column: 17}, end: {line: 22, column: 18}}
                                            },
                                            loc: {start: {line: 22, column: 13}, end: {line: 22, column: 18}}
                                        }
                                    ],
                                    kind: 'var',
                                    loc: {start: {line: 22, column: 9}, end: {line: 22, column: 18}}
                                },
                                test: {
                                    type: 'BinaryExpression',
                                    operator: '<',
                                    left: {
                                        type: 'Identifier',
                                        name: 'i',
                                        loc: {start: {line: 22, column: 20}, end: {line: 22, column: 21}}
                                    },
                                    right: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'myArray',
                                            loc: {start: {line: 22, column: 24}, end: {line: 22, column: 31}}
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'length',
                                            loc: {start: {line: 22, column: 32}, end: {line: 22, column: 38}}
                                        },
                                        loc: {start: {line: 22, column: 24}, end: {line: 22, column: 38}}
                                    },
                                    loc: {start: {line: 22, column: 20}, end: {line: 22, column: 38}}
                                },
                                update: {
                                    type: 'UpdateExpression',
                                    operator: '++',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'i',
                                        loc: {start: {line: 22, column: 40}, end: {line: 22, column: 41}}
                                    },
                                    prefix: false,
                                    loc: {start: {line: 22, column: 40}, end: {line: 22, column: 43}}
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'sum',
                                                    loc: {start: {line: 23, column: 8}, end: {line: 23, column: 11}}
                                                },
                                                right: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'sum',
                                                        loc: {
                                                            start: {line: 23, column: 14},
                                                            end: {line: 23, column: 17}
                                                        }
                                                    },
                                                    right: {
                                                        type: 'MemberExpression',
                                                        computed: true,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'myArray',
                                                            loc: {
                                                                start: {line: 23, column: 20},
                                                                end: {line: 23, column: 27}
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'i',
                                                            loc: {
                                                                start: {line: 23, column: 28},
                                                                end: {line: 23, column: 29}
                                                            }
                                                        },
                                                        loc: {
                                                            start: {line: 23, column: 20},
                                                            end: {line: 23, column: 30}
                                                        }
                                                    },
                                                    loc: {start: {line: 23, column: 14}, end: {line: 23, column: 30}}
                                                },
                                                loc: {start: {line: 23, column: 8}, end: {line: 23, column: 30}}
                                            },
                                            loc: {start: {line: 23, column: 8}, end: {line: 23, column: 31}}
                                        }
                                    ],
                                    loc: {start: {line: 22, column: 45}, end: {line: 24, column: 5}}
                                },
                                loc: {start: {line: 22, column: 4}, end: {line: 24, column: 5}}
                            }, {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'sum',
                                    loc: {start: {line: 25, column: 11}, end: {line: 25, column: 14}}
                                },
                                loc: {start: {line: 25, column: 4}, end: {line: 25, column: 15}}
                            }
                        ],
                        loc: {start: {line: 20, column: 23}, end: {line: 26, column: 1}}
                    },
                    generator: false,
                    expression: false,
                    loc: {start: {line: 20, column: 0}, end: {line: 26, column: 1}}
                }
            ],
            sourceType: 'script',
            loc: {start: {line: 1, column: 0}, end: {line: 26, column: 1}},
            fileLocation: 'spec/demo/demo.js'
        };
        expect(jsAST).toEqual(expectedDemoAST);
        JSON.stringify(jsAST, null, 4); // to debug
    });

});