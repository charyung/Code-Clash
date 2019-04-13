import axios from 'axios';

export function swapCodeBlocks(leftCode, rightCode)
{
	return{
		type: "SWAP_CODE_BLOCKS",
		payload: {
			leftCode: leftCode,
			rightCode: rightCode
		}
	}
}