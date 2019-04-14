// Action types
export const SWAP_CODE_BLOCKS = "SWAP_CODE_BLOCKS";


// Action interfaces
interface SwapCodeBlocksAction
{
	type: string;
	payload: {
		leftCode: string;
		rightCode: string;
	}
}

export type BlocksTypes = SwapCodeBlocksAction;

// Actions
export function swapCodeBlocks(leftCode: string, rightCode: string): BlocksTypes
{
	return{
		type: "SWAP_CODE_BLOCKS",
		payload: {
			leftCode: leftCode,
			rightCode: rightCode
		}
	}
}