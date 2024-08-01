<div
    class="border border-gray-200 dark:border-gray-600 rounded-lg bg-white/60 dark:bg-neutral-800/70 overflow-y-auto h-full @if ($disabled) bg-gray-50 text-gray-500 [-webkit-text-fill-color:theme(colors.gray.500)] dark:text-gray-400 dark:[-webkit-text-fill-color:theme(colors.gray.400)] @endif">
    <ul class="py-1 text-base text-gray-950 dark:text-white sm:text-sm sm:leading-6 ">
        <template x-for="(item, key) in {{ $target }}">
            <li>
                <a @if (!$disabled) x-on:click="toggleHighlight('{{ $target }}', key)" @endif
                    :class="{ '!bg-gray-200 dark:!bg-gray-500': item.highlighted }" x-text="item.label"
                    @if (!$disabled) x-on:dblclick="moveItem(item, '{{ $target }}', '{{ $target === 'options' ? 'selected' : 'options' }}')" @endif
                    class="block px-1 py-1 @if (!$disabled) hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer @endif">
                </a>
            </li>
        </template>
    </ul>
</div>
