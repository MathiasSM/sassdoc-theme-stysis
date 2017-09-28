{% if item.throw.length > 0 %}
  <h3 class="item__sub-heading">Throws</h3>

  <ul>
    {% for _throw in item.throw %}
      <li>{{ _throw|safe }}</li>
    {% endfor %}
  </ul>
{% endif %}
