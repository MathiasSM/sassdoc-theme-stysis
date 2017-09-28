<div class="sidebar__header">
  <div class="sidebar__title">
    {% if package.homepage %}
      <a href="{{ package.homepage }}">{{ project_title }}</a>
    {% else %}
      {{ project_title }}
    {% endif %}
    <br>
    {% if package.version %}v{{ package.version }}{% endif %}
  </div>
</div>

<div class="sidebar__body">
  {# No item documented #}
  {% if data.length == 0 %}
    <p class="sidebar__item  sidebar__item--heading">No documented item.</p>

  {# Some items documented #}
  {% else %}
    <button type="button" class="btn-toggle  js-btn-toggle" data-alt="Open all">Close all</button>

    {# Loop over the groups #}
    {% for group in data.byGroupAndType %}
      <p class="sidebar__item  sidebar__item--heading" data-slug="{{ group.name }}"><a href="#{{ group.name }}">{{ groups[group.name] }}</a></p>

      {# Loop over the types #}
      {% for type, items in group.group %}
        {% if loop.first %}<div>{% endif %}

        {# If items to be displayed in type #}
        {% if items.length > 0 %}
          <p class="sidebar__item  sidebar__item--sub-heading" data-slug="{{ group.name + '-' + type }}"><a href="#{{ group.name }}-{{ type }}">{{ type }}{% if type != "css" %}s{% endif %}</a></p>

          {# Loop over the items #}
          <ul class="list-unstyled">
          {% for item in items %}
            <li class="sidebar__item  sassdoc__item" data-group="{{ group.name }}" data-name="{{ item.context.name }}" data-type="{{ item.context.type }}">
              <a href="#{{ group.name }}-{{ item.context.type }}-{{ item.context.name }}">{{ item.context.name }}
              {% if item.access[0] == "private" %}<span class="sidebar__annotation  sidebar__annotation--private">private</span>{% endif %}
              {% if item.alias != false %}<span class="sidebar__annotation  sidebar__annotation--alias">alias</span>{% endif %}
              </a>
            </li>
          {% endfor %}
          </ul>
        {% endif %}
        {% if loop.last %}</div>{% endif %}
      {% endfor %}

    {% endfor %}
  {% endif %}
</div>
