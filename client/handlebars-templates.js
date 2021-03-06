this["JST"] = this["JST"] || {};

this["JST"]["client/views/design-comparator.handlebars"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div>\r\n    <div class=\"opacity-slider\">\r\n        <button data-image-opacity value=\"0\">Iframe</button>\r\n        <input type=\"range\" min=\"0\" max=\"100\" data-image-opacity value=\""
    + escapeExpression(((helper = (helper = helpers.opacity || (depth0 != null ? depth0.opacity : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"opacity","hash":{},"data":data}) : helper)))
    + "\">\r\n        <button data-image-opacity value=\"100\">Image</button>\r\n    </div>\r\n    <iframe></iframe>\r\n    <img />\r\n</div>\r\n";
},"useData":true});

this["JST"]["client/views/design-ui.handlebars"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "        <button class=\"sg-button-pill\" data-buttons-toggle></button>\r\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "    <div class=\"markdown-body sg-design-ui-documentation\">\r\n        ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0.documentation : depth0)) != null ? stack1.html : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n    </div>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "        <button value='";
  stack1 = ((helpers.stringify || (depth0 && depth0.stringify) || helperMissing).call(depth0, depth0, {"name":"stringify","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "'>\r\n            <span class=\"sg-design-ui-button-width\" style=\"width: "
    + escapeExpression(lambda((depth0 != null ? depth0.width : depth0), depth0))
    + "px\"></span>\r\n            <span class=\"sg-design-ui-button-label\">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</span>\r\n        </button>\r\n";
},"6":function(depth0,helpers,partials,data) {
  return "";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<header>\r\n    <h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</header>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.documentation : depth0)) != null ? stack1.html : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "<div class=\"sg-design-ui-buttons\" data-buttons>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.images : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n";
},"useData":true});