import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // const title = titleRef.current?.value;
    // const markdown = markdownRef.current?.value;
    // console.log(title, markdown);
    onSubmit({
      title: titleRef.current?.value || "",
      markdown: markdownRef.current?.value || "",
      tags: [],
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                type="text"
                placeholder="Enter title"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreateReactSelect // https://react-select.com/creatable
                value={tags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} as="textarea" rows={12} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit">Save</Button>
          <Link to="..">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
