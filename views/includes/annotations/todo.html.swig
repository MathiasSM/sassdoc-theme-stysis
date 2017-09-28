{% if item.todo.length > 0 %}
  <h3 class="item__sub-heading">TODO</h3>

  <ul>
    {% for todo in item.todo %}
      <li>{{ todo|safe }}</li>
    {% endfor %}
  </ul>
{% endif %}
