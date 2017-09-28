{% if styleguide %}
<section class="main__section">
  <h1 class="main__heading" id="styleguide">
  	<div class="container">
  		Style Guide
  	</div>
 	</h1>
  {# Colors #}
  {% if styleguide.colors.length > 0 %}
		<section class="main__sub-section" id="styleguide__colors">
		  <h2 class="main__heading--secondary">
		    <div class="container">
		      Color{% if styleguide.colors.length > 1 %}s{% endif %}
		    </div>
		  </h2>

		  <section class="styleguide__colors container">
			  <ul class="styleguide__colors-list list-unstyled">
				  {% for color in styleguide.colors %}
				    {% include "../styleguide/color.html.swig" with context %}
				  {% endfor %}
				</ul>
			</section>
		</section>
	{% endif %}
</section>
{% endif %}
