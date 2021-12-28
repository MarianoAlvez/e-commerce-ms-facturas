import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Factura,
  ProductoFactura,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaProductoFacturaController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/producto-facturas', {
    responses: {
      '200': {
        description: 'Array of Factura has many ProductoFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoFactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductoFactura>,
  ): Promise<ProductoFactura[]> {
    return this.facturaRepository.tiene(id).find(filter);
  }

  @post('/facturas/{id}/producto-facturas', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoFactura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoFactura, {
            title: 'NewProductoFacturaInFactura',
            exclude: ['id'],
            optional: ['id_factura']
          }),
        },
      },
    }) productoFactura: Omit<ProductoFactura, 'id'>,
  ): Promise<ProductoFactura> {
    return this.facturaRepository.tiene(id).create(productoFactura);
  }

  @patch('/facturas/{id}/producto-facturas', {
    responses: {
      '200': {
        description: 'Factura.ProductoFactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoFactura, {partial: true}),
        },
      },
    })
    productoFactura: Partial<ProductoFactura>,
    @param.query.object('where', getWhereSchemaFor(ProductoFactura)) where?: Where<ProductoFactura>,
  ): Promise<Count> {
    return this.facturaRepository.tiene(id).patch(productoFactura, where);
  }

  @del('/facturas/{id}/producto-facturas', {
    responses: {
      '200': {
        description: 'Factura.ProductoFactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductoFactura)) where?: Where<ProductoFactura>,
  ): Promise<Count> {
    return this.facturaRepository.tiene(id).delete(where);
  }
}
