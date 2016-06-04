##Plugin for multi line clamping text

#How to use
- To div with text put class "js-clamp"
```
<div class="js-clamp"></div>
```
- add data attribute "data-clampin" with amount row that you want clamp   
```
<div class="js-clamp" data-clampin="4"></div>
```
- include js and css to page

```
 <link rel="stylesheet" href="../lib/multiLineClamp.css">
 <script src="../lib/multiLineClamp.js" ></script>
```

- add declaration plugin in the end of page
```
<script>new CutTextMethod({});</script>
```