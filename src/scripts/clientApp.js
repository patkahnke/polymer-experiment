$(document).ready(function () {
  getArticles();

  // add an article
  $('#articleSubmit').on('click', postArticle);


function getArticles() {
  $.ajax({
    type: 'GET',
    url: '/articles',
    success: function (articles) {
      console.log(articles);
      articles.forEach(function (article) {
      $('#articleList').empty();
        $('#articleList').append('<h2>' + article.title + '</h2>' +
          '<p>' + article.content + '</p>' +
          '<h3>' + article.author + '</h3>');
        });
      }
    });


}

function postArticle() {
  event.preventDefault();
  console.log('post article is called');

  var article = {};

  $.each($('#articleForm').serializeArray(), function (i, field) {
    article[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/articles',
    data: article,
    success: function (data) {
      console.log('Successful post!');
      getArticles();
    },
  });

}
});
