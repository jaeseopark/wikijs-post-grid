# WikiJS Post Grid

A TypeScript library for displaying WikiJS posts in a responsive grid layout, perfect for landing pages.

![Sample Image](docs/wikijs-post-grid-sample.jpg)

## Usage

### Basic Usage

Put the snippet below in the Scripts section of your landing page.

```html
<script src="path/to/wikijs-post-grid.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    WikiJSPostGrid.showGrid();
  });
</script>
```

And the content of the said page:

```html
<div id="wikijs-post-grid" />
```

### Advanced Usage

```html
<script src="path/to/wikijs-post-grid.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    WikiJSPostGrid.showGrid({
      maxPosts: 8, // default: 16
      enrichPost: ({ tags }) => {
        // Custom post enrichment - return additional properties
        return {
          isFeatured: tags.includes('featured'),
        };
      },
      filterPost: (post) => {
        // Custom filtering logic - can use enriched properties
        return post.isFeatured;
      },
      sortPost: (a, b) => {
        // Custom sorting logic (default: newest first by time)
        return b.title.localeCompare(a.title); // Sort by title Z-A
      },
      renderDate: (date) => {
        // Custom date formatting
        return date.toLocaleDateString('en-GB');
      },
      renderTitle: ({ title, tags}) => {
        const prefix = tags.includes("big project") ? "🔥" : "";
        return `${prefix}${title}`
      }
    });
  });
</script>
```

## API

### `showGrid(options?: GridOptions)`

Renders a grid of WikiJS posts in the element with id `wikijs-post-grid`.

#### GridOptions

| Key | Type | Description | Default |
|-----------|------|-------------|---------|
| maxPosts | number | Maximum number of posts to display | 16 |
| renderDate | (date: Date) => string | Function to format dates | `date.toLocaleDateString()` |
| renderTitle | (post: EnrichedPost<T>) => string | Function to customize the title rendering | `post => post.title` |
| enrichPost | (post: WikiJsPost) => T | Function to enrich posts with additional properties before rendering | undefined (no enrichment) |
| filterPost | (post: EnrichedPost<T>) => boolean | Function to filter which posts to display | undefined (no filtering) |
| sortPost | (a: EnrichedPost<T>, b: EnrichedPost<T>) => number | Function to sort posts | unefined (no sorting) |