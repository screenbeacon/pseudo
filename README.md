pseudo
============

Pseudo allows you to style CSS pseudo elements like `:before` and `:after` with JavaScript. This is very useful for positioning elements dynamiclly like pips on a tooltip or dropdown element. Styling these elements is usually relagated to just a CSS approach.

Example:

```
pseudo('.tooltip:after', {
  bottom: '15px',
  left: '27px'
});
```
