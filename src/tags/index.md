---
layout: layout.njk
title: "Tags"
permalink: "/tags/"
---

<h1>Tags</h1>
<ul>
{% for tag in collections.all | getAllTags %}
  {% if tag != "all" and tag != "scene" %}
    <li><a href="/tags/{{ tag | slug }}/">{{ tag }}</a></li>
  {% endif %}
{% endfor %}
</ul>
