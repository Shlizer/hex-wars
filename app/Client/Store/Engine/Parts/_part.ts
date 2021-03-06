import WithContext from '../../_withContext';
import { clearContext } from '../helpers';
import State from '../../State';

export default class EnginePart extends WithContext {
  shouldUpdate = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkCurrent(obj1: { [key: string]: any }, key: string, data: unknown) {
    if (obj1?.[key] !== data) {
      obj1[key] = data;
      this.shouldUpdate = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(_time: number): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderWrapper(_mainContext: CanvasRenderingContext2D): void {
    if (this.shouldUpdate) {
      clearContext(this.context);
      this.context.scale(State.viewport.scale, State.viewport.scale);
      this.renderPrepare();
      this.shouldUpdate = false;
    }
    if (this.canvas.width && this.canvas.height) {
      this.renderOnMain(_mainContext);
    } else {
      console.log('Canvas size is 0');
      this.shouldUpdate = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {
    throw new Error('Method not implemented.');
  }
}
