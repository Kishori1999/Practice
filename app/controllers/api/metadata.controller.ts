import { metadata } from 'app/metadataProvider';
import BaseController from 'app/lib/base.controlizer.controller';

/**
 * @apiGroup Metadata
 * @apiName GetAll
 * @api {get} /api/metadata/all Get All Metadata
 * @apiDescription Returns array of metadata.
 *
 * @apiSuccess {Array} 0
 * @apiSuccess {Number} 0.id
 * @apiSuccess {String} 0.name
 * @apiSuccess {String} 0.class
 * @apiSuccess {String} 0.tagline
 * @apiSuccess {String} 0.faction
 * @apiSuccess {String} 0.element
 *
 * @apiSuccess {Array} 1
 * @apiSuccess {Number} 1.id
 * @apiSuccess {String} 1.name
 * @apiSuccess {Number} 1.heroPetType
 * @apiSuccess {Number} 1.rarity
 * @apiSuccess {String} 1.class
 * @apiSuccess {String} 1.effect
 * @apiSuccess {String} 1.effect2
 *
 * @apiSuccess {Array} 2
 * @apiSuccess {Number} 2.id
 * @apiSuccess {String} 2.name
 * @apiSuccess {String} 2.assetBase
 */
class MetadataController extends BaseController {
  constructor(options = {}) {
    Object.assign(options, {
      path: '/api/metadata',
      actions: {
        getAll: BaseController.createAction({
          method: 'get',
          path: '',
        }),
      },
    });
    super(options);
  }

  async getAll() {
    return metadata;
  }
}

export = MetadataController;
