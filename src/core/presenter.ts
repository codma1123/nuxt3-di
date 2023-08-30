export default interface IPresenter<TState> {
  getState(): TState;
}
