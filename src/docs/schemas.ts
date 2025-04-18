export const swaggerSchemas = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      name: {
        type: 'string',
        example: 'João Silva',
      },
      email: {
        type: 'string',
        example: 'joao@email.com',
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2024-04-17T12:34:56Z',
      },
    },
  },
  Room: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: '1'
      },
      name: {
        type: 'string',
        example: 'Sala principal'
      },
      capacity: {
        type: 'integer',
        example: '25'
      },
      location: {
        type: 'string',
        example: 'Escritório 1 andar'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2024-04-17T12:34:56Z',
      },
    },
    Reservation: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        user_id: {
          type: 'integer',
          example: 3,
        },
        room_id: {
          type: 'integer',
          example: 2,
        },
        title: {
          type: 'string',
          example: 'Reunião de planejamento',
        },
        description: {
          type: 'string',
          example: 'Reunião para definir metas do próximo trimestre',
        },
        start_time: {
          type: 'string',
          format: 'date-time',
          example: '2024-04-20T09:00:00-03:00',
        },
        end_time: {
          type: 'string',
          format: 'date-time',
          example: '2024-04-20T10:30:00-03:00',
        },
        created_at: {
          type: 'string',
          format: 'date-time',
          example: '2024-04-17T14:15:00Z',
        },
      },
      required: ['user_id', 'room_id', 'title', 'start_time', 'end_time'],
    },
  }
};
