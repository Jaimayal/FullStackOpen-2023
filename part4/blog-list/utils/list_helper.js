const dummy = (blogs) => {
	return 1;
};

const sumLikes = (blogs) => {
    return blogs
        .map(elem => elem.likes)
        .reduce((acc, elem) => acc + elem, 0);
}

const favoriteBlog = (blogs) => {
    if (!blogs.length) {
        return {};
    }

    let indexOfFavorite = -1;
    let maxLikes = -1;
    for (const [key, value] of Object.entries(blogs)) {
        if (value.likes > maxLikes) {
            maxLikes = value.likes
            indexOfFavorite = key
        }
    }

    return {
        "title": blogs[indexOfFavorite].title,
        "author": blogs[indexOfFavorite].author,
        "likes": blogs[indexOfFavorite].likes
    }
}

const authorWithMostBlogs = (blogs) => {
    if (!blogs.length) {
        return {};
    }
    const authors = {}

    for (const blog of blogs) {
        if (Object.keys(authors).includes(blog.author)) {
            authors[blog.author] += 1;
        } else {
            authors[blog.author] = 1;
        }
    }

    let nameOfAuthor = -1;
    let totalBlogs = -1;
    for (const [author, blogs] of Object.entries(authors)) {
        if (blogs > totalBlogs) {
            totalBlogs = blogs
            nameOfAuthor = author
        }
    }

    return {
        "author": nameOfAuthor,
        "blogs": totalBlogs
    }
}

const authorWithMostLikes = (blogs) => {
    if (!blogs.length) {
        return {};
    }
    const authors = {}

    for (const blog of blogs) {
        if (Object.keys(authors).includes(blog.author)) {
            authors[blog.author] += blog.likes;
        } else {
            authors[blog.author] = blog.likes;
        }
    }

    let nameOfAuthor = -1;
    let totalLikes = -1;
    for (const [author, likes] of Object.entries(authors)) {
        if (likes > totalLikes) {
            totalLikes = likes
            nameOfAuthor = author
        }
    }

    return {
        "author": nameOfAuthor,
        "likes": totalLikes
    }
}

module.exports = {
	dummy,
    sumLikes,
    favoriteBlog,
    authorWithMostBlogs,
    authorWithMostLikes
};
