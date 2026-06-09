export const ORDER_SCALE_FACTOR = 1_000_000;

export const ORDER_TO_API_EXPRESSION = `={{ Math.round($value * ${ORDER_SCALE_FACTOR}) }}`;

export const NUMBER_LIST_TO_CSV_EXPRESSION =
	'={{ Array.isArray($value) ? $value.join(",") : $value }}';

export const BOOLEAN_FLAG_TO_ONE_EXPRESSION = '={{ $value ? "1" : undefined }}';
