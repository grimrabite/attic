---
layout: layout.njk
title: "The Attic"
---

<div class="grid-posts">
{% for post in collections.all | reverse | slice(0, 12) %}
  <div class="post-card">
    <div class="title">
      <a href="{{ post.url }}">{{ post.data.title }}</a>
    </div>
    {% if post.data.tags %}
      <div class="meta">
        {{ post.date | date("yyyy-MM-dd") }}{% if post.data.tags %} &nbsp; | &nbsp; {{ post.data.tags | join(", ") }}{% endif %}
      </div>
    {% endif %}
    {% if post.data.description %}
      <div class="desc">
        {{ post.data.description }}
      </div>
    {% endif %}
  </div>
{% endfor %}
</div>