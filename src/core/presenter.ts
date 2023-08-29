export default interface IPresenter<TState> {
	getState(): Ref<TState>;
}
