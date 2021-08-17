/**
 * Created by vedi on 09/12/18.
 */

'use strict';

const _ = require('lodash');
const Controlizer = require('controlizer');

const defaultAction = {
  enabled: true,
};

class BaseControlizerController extends Controlizer.Controller {
  constructor(options) {
    super(options || { actions: { default: defaultAction } });
  }

  static createAction(options) {
    return _.defaults(options, defaultAction);
  }

  static getName() {
    return this.name.charAt(0).toLowerCase() + this.name.replace('Controller', '').slice(1);
  }
}

module.exports = BaseControlizerController;
