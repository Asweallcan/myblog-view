export default function ({store, error, redirect}) {
    if (!store.state.admin || !store.state.admin.username) {
        error({message: "请登陆", statusCode: 403});
    }
}