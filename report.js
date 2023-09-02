function printReport(pages) {
    console.log('\nStart of the webcrawling report:');
    console.log('------------------------------------\n');

    const sortedPages = sortPageInstances(pages);

    for (url of sortedPages) {
        const count = pages[url].count;
        console.log(`There were ${count} internal links to ${url}.`);
    }
}

function sortPageInstances(pages) {
    const pageArray = Object.keys(pages).map((page) => ({
        url: page,
        count: pages[page].count,
    }));

    pageArray.sort((a, b) => b.count - a.count);

    const sortedPages = pageArray.map((page) => page.url);

    return sortedPages;
}

module.exports = {
    printReport,
    sortPageInstances
}