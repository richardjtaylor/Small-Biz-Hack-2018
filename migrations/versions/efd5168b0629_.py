"""empty message

Revision ID: efd5168b0629
Revises: e0058484fdf7
Create Date: 2018-12-02 01:24:35.789722

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'efd5168b0629'
down_revision = 'e0058484fdf7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('image_tag', sa.Column('name', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('image_tag', 'name')
    # ### end Alembic commands ###
