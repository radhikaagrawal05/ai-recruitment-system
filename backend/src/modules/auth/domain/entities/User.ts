import { UserRole } from "../value-objects/UserRole";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id() { return this.props.id; }
  get name() { return this.props.name; }
  get email() { return this.props.email; }
  get password() { return this.props.password; }
  get role() { return this.props.role; }
}