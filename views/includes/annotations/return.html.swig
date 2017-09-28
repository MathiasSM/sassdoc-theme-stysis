{% if item.return %}
  <h3 class="item__sub-heading">Returns</h3>

  <div class="item__description  item__description--inline">
  <code>
  {% if item.return.type == '*' %}
    Any
  {% else %}
    {{ item.return.type | display_as_type }}
  {% endif %}
  </code>
  {% if item.return.description %} &mdash; {{ item.return.description|safe }}{% endif %}
  </div>
{% endif %}
