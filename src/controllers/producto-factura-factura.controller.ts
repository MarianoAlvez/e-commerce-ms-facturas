import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductoFactura,
  Factura,
} from '../models';
import {ProductoFacturaRepository} from '../repositories';

export class ProductoFacturaFacturaController {
  constructor(
    @repository(ProductoFacturaRepository)
    public productoFacturaRepository: ProductoFacturaRepository,
  ) { }

  @get('/producto-facturas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to ProductoFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.number('id') id: typeof ProductoFactura.prototype.id,
  ): Promise<Factura> {
    return this.productoFacturaRepository.pertenece_a(id);
  }
}
