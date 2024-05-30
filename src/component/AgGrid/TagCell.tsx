const TagCell = (props: { data: { tags: string[] } }) => {
  return (
    <div className="w-full h-full flex items-center gap-5 overflow-hidden">
      {props.data.tags &&
        props.data.tags.map((e: string, i: number) => (
          <div key={i} className="rounded-10 px-12 py-6 bg-Gray1 text-14">
            {e}
          </div>
        ))}
    </div>
  );
};

export default TagCell;
