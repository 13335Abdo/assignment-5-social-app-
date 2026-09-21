function removeElement(nums, val) {
    let k = 0; // مؤشر بيحدد مكان آخر عنصر "صالح" حطيناه

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
}