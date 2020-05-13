import {
  Tileset as TSConfig,
  Tile as TConfig
} from '../../../Definitions/tileset';
import Tileset from './tileset';
import Loader from '../Loader';

export default class TSManager {
  static list: Tileset[] = [];

  static load(configs: TSConfig[]): Promise<unknown> {
    Loader.add('map-tileset-load', 'Parsowanie tilesetów');
    const promises: Promise<Tileset>[] = [];
    configs.forEach(cfg => promises.push(TSManager.loadTileset(cfg)));
    return Promise.all(promises)
      .finally(() => Loader.remove('map-tileset-load'))
      .catch((err: Error) =>
        document.dispatchEvent(
          new CustomEvent('app-error', { detail: err.message })
        )
      );
  }

  static loadTileset(config: TSConfig): Promise<Tileset> {
    return new Promise((resolve, reject) => {
      const ts = new Tileset(config);
      ts.loadGfx()
        .then(() => resolve(ts))
        .catch((err: Error) => reject(err));
      this.list.push(ts);
    });
  }

  static getTile(
    tilesetId: string,
    tileId: string | number
  ): TConfig | undefined {
    return this.list
      .find(tileset => tileset.config.id === tilesetId)
      ?.getTile(tileId);
  }
}
