"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
exports.World = {
    get: {
        tags: ['World'],
        description: 'Returns available worlds list',
        operationId: 'get_world',
        responses: {
            '200': {
                description: 'List of worlds',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    sub_domain: {
                                        type: 'string',
                                    },
                                    domain: {
                                        type: 'string',
                                    },
                                    name: {
                                        type: 'string',
                                    },
                                    is_available: {
                                        type: 'boolean',
                                    },
                                    last_activity: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    post: {
        tags: ['World'],
        description: 'Adds new world to watchlist',
        operationId: 'post_world',
        responses: {
            '200': {
                description: 'World added to watchlist',
                content: {
                    'application/json': {},
                },
            },
            '500': {
                description: 'World not added to watchlist',
                content: {
                    'application/json': {},
                },
            },
            '401': {
                description: 'Permission denied, password required',
                content: {
                    'application/json': {},
                },
            },
        },
        requestBody: {
            description: 'Request body',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            domain: {
                                description: 'Server domain',
                                type: 'string',
                            },
                            name: {
                                description: 'Friendly name of World',
                                type: 'string',
                            },
                            sub_name: {
                                description: 'Server sub-domain',
                                type: 'string',
                            },
                            password: {
                                description: 'Administrator app password',
                                type: 'string',
                            },
                        },
                        required: ['domain', 'name', 'sub_name'],
                    },
                },
            },
        },
    },
};
