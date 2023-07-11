import { Component } from "solid-js";

const Tag: Component<Tag> = ({ name }: Tag) => {
    return( 
        <div class="px-3 py-1.5 bg-gray-100 rounded-full font-semibold">
            {name}
        </div>
    )
}

export default Tag;