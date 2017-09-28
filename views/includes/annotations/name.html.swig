<h3 class="item__heading">
  {% if item.access != "public" %}
    <span class="item__access">[{{ item.access }}]</span>
  {% endif %}

  <a class="item__name" href="#{{ group.name }}-{{ item.context.type }}-{{ item.context.name }}">{{ item.context.name }}</a>

  {% if item.aliased.length > 0 %}
    <span class="item__aliased">(synonym:
    {% for alias in item.aliased %}
      <a href="#{{ group.name }}-{{ item.context.type }}-{{ alias }}"><code>{{ alias }}</code></a>
    {% endfor %}
    )</span>
  {% endif %}

  {% if item.alias %}
    <span class="item__alias">(alias for <a href="#{{ group.name }}-{{ item.context.type }}-{{ item.alias }}"><code>{{ item.alias }}</code></a>)</span>
  {% endif %}
</h3>

{% if item.since.length >= 1 %}
  <span class="item__since">First in {{ item.since[0].version }}</span>
{% endif %}
