{% if 'content'|in(item) %}
  <h3 class="item__sub-heading">Content</h3>

  <p>Allows extra content to be passed through the <code>@content</code> directive.{% if item.content !== "" %} Role: {{ item.content }}</p>
{% endif %}
