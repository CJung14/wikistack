const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">
    
    
    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>
    </div>

    <div><label for="Content" class="col-sm-2 control-label">Content</label>
    <div class="col-sm-10">
      <textarea id="content" name="content" type="text-area" class="form-control"></textarea>
    </div></div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>
  
  </form>
`);




{/* <div><label for="name" class="col-sm-2 control-label">Author</label>
<div class="col-sm-10">
  <input id="name" name="name" type="text" class="form-control"/>
</div></div>

<div><label for="email" class="col-sm-2 control-label">Email</label>
<div class="col-sm-10">
  <input id="email" name="email" type="text" class="form-control"/>
</div></div> */}