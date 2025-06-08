---
layout: layout.njk
title: Tags
permalink: /tags/
---

<h1>All Tags</h1>
<ul>
  {% for tag in collections.all | getAllTags %}
    <li><a href="/tags/{{ tag | slug }}/">{{ tag }}</a></li>
  {% endfor %}
</ul>
