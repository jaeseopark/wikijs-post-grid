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
      enrichPost: (post) => {
        // Custom post enrichment
        return post;
      },
      filterPost: (post) => {
        // Custom filtering logic
        return post.tags && post.tags.includes('featured');
      },
      sortPost: (a, b) => {
        // Custom sorting logic (default: newest first by time)
        return b.title.localeCompare(a.title); // Sort by title Z-A
      },
      formatDate: (date) => {
        // Custom date formatting
        return date.toLocaleDateString('en-GB');
      }
    });
  });
</script>
```

## API

### `showGrid(options?: GridOptions)`

Renders a grid of WikiJS posts in the element with id `wikijs-post-grid`.

#### Options

- `maxPosts?: number` - Maximum number of posts to display (default: 16)
- `enrichPost?: (page: WikiJSPage) => WikiJSPage` - Function to enrich/modify posts before rendering
- `filterPost?: (page: WikiJSPage) => boolean` - Function to filter which posts to display (default: finished projects only)
- `sortPost?: (a: EnrichedPage, b: EnrichedPage) => number` - Function to sort posts (default: newest first by time)
- `formatDate?: (date: Date) => string` - Function to format dates (default: US format)

## Types

The library exports TypeScript types for better development experience:

- `WikiJSPage` - Raw page data from WikiJS GraphQL API
- `EnrichedPage` - Page data with additional computed properties
- `GridOptions` - Configuration options for the grid
