/**
 * JsonLd — lightweight server component for injecting JSON-LD structured data.
 * Usage: <JsonLd schema={buildHotelSchema()} />
 */

type Props = {
  schema: unknown;
};

export function JsonLd({ schema }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
