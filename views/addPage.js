const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form class="form-horizontal" method="POST" action="/wiki/">
    
    <div class="form-group">
    <label for='authorName' class="col-sm-2 control-label">Author Name</label>
    <div class='col-sm-10'>
    <input id="authorName" name="authorName" type-text class="form-control"/>
    </div>
    </div>
    
    <div class="form-group">
    <label for="authorEamil" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
    <input id="authorEmail" name="authorEamil" type="email" class="form-control"/>
    </div>
    </div>
    
    
    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>
    </div>
    
    <div class="form-group">
      <label for="pageContent" class="col-sm-2 control-label">Page Content</label>
      <div class="col-sm-10">
        <textarea id="pageContent" name="pageContent" class="form-control" rows="10"></textarea>
      </div>
    </div>
    
     <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="radio">
          <label>
          <input type="radio" name="pageStatus" id="pageOpen" value="open" checked>
          Page is Open
          </label>
        </div>
        <div class="radio">
          <label>
          <input type="radio" name="pageStatus" id="pageClosed" value="closed">
          Page is Closed
          </label>
        </div>
      </div>
    </div>
    
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>
  
  </form>
`);