function showFilter() {
    const form = document.getElementById('filterContent');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function showAddNew() {
    const form = document.getElementById('newContent');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function filterArticles() {
    const opinion = document.getElementById('opinionCheckbox').checked;
    const recipe = document.getElementById('recipeCheckbox').checked;
    const update = document.getElementById('updateCheckbox').checked;

    document.querySelectorAll('#articleList article').forEach(article => {
        const cls = article.className;
        article.style.display = 
            (cls.includes('opinion') && opinion) ||
            (cls.includes('recipe') && recipe) ||
            (cls.includes('update') && update) ? '' : 'none';
    });
}

function addNewArticle() {
    const title = document.getElementById('inputHeader').value.trim();
    const text = document.getElementById('inputArticle').value.trim();
    if (!title || !text) return;

    const type = document.querySelector('input[name="articleType"]:checked')?.id.replace('Radio', '');
    if (!type) return;

    const list = document.getElementById('articleList');
    const article = document.createElement('article');
    article.className = type;
    article.innerHTML = `
        <span class="marker">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p><a href="moreDetails.html">Read more...</a></p>
    `;
    list.appendChild(article);

    document.getElementById('inputHeader').value = '';
    document.getElementById('inputArticle').value = '';
    document.querySelectorAll('input[name="articleType"]').forEach(r => r.checked = false);

    filterArticles();
}
