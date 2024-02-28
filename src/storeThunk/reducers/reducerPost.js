export default (post = [], action) => {
    console.log('post: ', post);
    console.log('action: ', action);
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...post, action.payload];
        default:
            return post;
    }
}