<script>
  import Card from "./components/Card.svelte";

  const data = {
    name: "Simple Doc Name",
    description: "A sample description that describes the document",
    itemId: "1234",
    tags: ["foo", "bar"],
  };
</script>

<Card {...data} />
