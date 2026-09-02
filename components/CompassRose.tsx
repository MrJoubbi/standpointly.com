/**
 * Standpointly Brand Mark.
 * Exact coordinate pin + perspective base geometry from the brand SVG.
 * Centred on (0, 0) inside a -120 -120 240 240 viewBox.
 */
export function CompassRose({ fill = "var(--color-ink)" }: { fill?: string }) {
  return (
    <g className="standpoint-brand-mark" transform="translate(-120, -120)">
      <g transform="translate(10 16) scale(.82)">
        <path
          d="M14 201 60 151h61l24 28 25-28h61l45 50Z"
          fill={fill}
        />
        <path
          d="M145 24c-46 0-77 33-77 76 0 56 77 135 77 135s77-79 77-135c0-43-31-76-77-76Z"
          fill={fill}
        />
        <circle cx="145" cy="100" r="28" fill="var(--color-canvas, #ffffff)" />
      </g>
    </g>
  );
}
