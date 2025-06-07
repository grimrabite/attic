---
layout: layout.njk
title: All Characters
pagination:
  data: collections.scene
  size: 100
permalink: /characters/
---

<h1>Characters</h1>

<ul>
{% for post in pagination.items %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> <em>({{ post.date | date: "%Y-%m-%d" }})</em>
  </li>
{% endfor %}
</ul>