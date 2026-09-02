import React from "react";

interface StandpointMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  className?: string;
}

/**
 * The official Standpointly Mark (Perspective-point icon).
 * Features a compound path with a transparent aperture cutout.
 */
export function StandpointMark({
  size = 32,
  fill = "currentColor",
  className = "",
  ...props
}: StandpointMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 264 220"
      fill="none"
      className={className}
      role="img"
      aria-label="Standpointly mark"
      {...props}
    >
      <g transform="translate(-12, -20)">
        {/* Baseline perspective horizon platform */}
        <path
          d="M14 201 60 151h61l24 28 25-28h61l45 50Z"
          fill={fill}
        />
        {/* Pin marker with compound transparent aperture cutout */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M145 24c-46 0-77 33-77 76 0 56 77 135 77 135s77-79 77-135c0-43-31-76-77-76Zm0 48a28 28 0 1 1 0 56 28 28 0 0 1 0-56Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

interface StandpointFullLogoProps extends React.SVGProps<SVGSVGElement> {
  height?: number | string;
  width?: number | string;
  className?: string;
  fill?: string;
}

/**
 * The full Standpointly SVG Logo (Icon + Typography Wordmark).
 * Clean, tight viewBox with typography matching the site's Inter Display styling.
 */
export function StandpointFullLogo({
  height,
  className = "",
  fill = "currentColor",
  ...props
}: StandpointFullLogoProps) {
  return (
    <svg
      viewBox="0 0 950 216"
      height={height}
      className={`max-w-full ${className}`}
      role="img"
      aria-label="Standpointly"
      {...props}
    >
      {/* Icon mark */}
      <g transform="translate(-8, -18) scale(0.96)">
        <path
          d="M14 201 60 151h61l24 28 25-28h61l45 50Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M145 24c-46 0-77 33-77 76 0 56 77 135 77 135s77-79 77-135c0-43-31-76-77-76Zm0 48a28 28 0 1 1 0 56 28 28 0 0 1 0-56Z"
          fill={fill}
        />
      </g>

      {/* Brand wordmark matching site typography */}
      <text
        x="248"
        y="156"
        fill={fill}
        fontFamily="var(--font-display), 'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="138"
        fontWeight="800"
        letterSpacing="-0.038em"
      >
        Standpointly
      </text>
    </svg>
  );
}
