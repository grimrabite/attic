---
layout: layout.njk
title: The Attic
pagination:
  data: collections.scene
  size: 100
permalink: /attic/
---

<h1>The Attic</h1>

<ul>
{% for post in pagination.items %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> <em>({{ post.date | date: "%Y-%m-%d" }})</em>
  </li>
{% endfor %}
</ul>